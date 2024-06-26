/* eslint-disable no-console */
/* @ts-expect-error email signature file */
import emailSignature from './emailSignature.html';

interface ContactForm {
  name: string;
  email?: string;
  phoneNumber: string;
  source: string;
  additionalInformation?: string;
}

// eslint-disable-next-line max-len, no-control-regex
const validEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const isEmpty = (value: string | undefined) => value == null || value.trim() === '';

const sourceMap = {
  google: 'a Google search',
  facebook: 'our Facebook page',
  instagram: 'our Instagram page',
  friend: 'a friend referring them to us',
  family: 'a family member referring them to us',
  advert: 'an advert we have placed',
};

async function sendEmailToSalesDepartment(name: string, source: string, phoneNumber: string, email: string | undefined, additionalInformation: string | undefined, env: Parameters<PagesFunction>[0]['env']) {
  const sourceText = sourceMap[source];
  let content = `Hi,\n\n${name} has contacted us via our website asking for an appointment to be booked with them.\n\n`;
  if (sourceText != null) content += `They have found us by ${sourceText}.\n\n`;
  if (!isEmpty(email)) {
    content += `You can call them on ${phoneNumber} but they have also provided their email address as "${email}".\n\n`;
  } else {
    content += `You can call them on ${phoneNumber}.\n\n`;
  }
  if (!isEmpty(additionalInformation)) content += `They have also provided us with the following information:\n${additionalInformation}\n\n`;

  console.log('Sending email to sales department...');
  const sendRequest = new Request('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: 'sales@rayneswayblinds.com', name: 'Raynesway Blinds Sales Department' }],
        dkim_domain: 'rayneswayblinds.com',
        dkim_selector: 'mailchannels',
        dkim_private_key: (env as any).MAILCHANNELS_DKIM_PRIVATE_KEY,
      }],
      from: { email: 'no-reply@rayneswayblinds.com', name: 'Raynesway Blinds Website' },
      subject: `${name} has requested an appointment.`,
      content: [{
        type: 'text/plain',
        value: content,
      }],
    }),
  });
  const response = await fetch(sendRequest);
  const responseText = await response.text();
  if (response.ok) {
    console.log('Email sent to sales department.');
  } else {
    console.error('Failed to send email to sales department.', { status: response.status, statusText: response.statusText, responseText });
    throw new Error('We\'re really sorry but we were unable to send your details to our sales department.');
  }
}

async function sendEmailToSender(name: string, email: string | undefined, env: Parameters<PagesFunction>[0]['env']) {
  if (isEmpty(email)) return;

  const content = `Hi ${name},<br /><br />Thank you very much for your request to make an appointment with us via our website.<br /><br />` +
    'We will be in touch with you very soon to arrange a suitable time for us to come and visit you and ' +
    `measure up where your new blinds, shutters or awnings will be installed.<br />${emailSignature}`;

  console.log('Sending email to sender...');
  const sendRequest = new Request('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email, name }],
        dkim_domain: 'rayneswayblinds.com',
        dkim_selector: 'mailchannels',
        dkim_private_key: (env as any).MAILCHANNELS_DKIM_PRIVATE_KEY,
      }],
      from: { email: 'sales@rayneswayblinds.com', name: 'Raynesway Blinds Sales Department' },
      subject: `Thank you ${name} for your request to make an appointment with us.`,
      content: [{
        type: 'text/html',
        value: content,
      }],
    }),
  });
  const response = await fetch(sendRequest);
  const responseText = await response.text();
  if (response.ok) {
    console.log('Email sent to sender.');
  } else {
    console.error('Failed to send email to sender.', { status: response.status, statusText: response.statusText, responseText });
  }
}

export const onRequest: PagesFunction = async ({ request, env }) => {
  try {
    console.log('Request received from contact form.', { IPAddress: request.headers.get('CF-Connecting-IP'), method: request.method });

    if (request.method !== 'POST') {
      console.error('Method not allowed', { method: request.method });
      return new Response('Method not allowed', { status: 405 });
    }

    console.log('Extracting contact form data from request body...');
    const { name, email, phoneNumber, source, additionalInformation } = await request.json<ContactForm>();
    console.log('Extracted contact form data.', { name, email, phoneNumber, source, additionalInformation });

    if (isEmpty(name)) {
      console.error('The name field cannot be empty.');
      return new Response('The name field cannot be empty.', { status: 400 });
    }
    if (isEmpty(phoneNumber)) {
      console.error('The phone number field cannot be empty.');
      return new Response('The phone number field cannot be empty.', { status: 400 });
    }
    if (isEmpty(source)) {
      console.error('The source field cannot be empty.');
      return new Response('The source field cannot be empty.', { status: 400 });
    }
    if (!isEmpty(email) && !validEmail.test(email)) {
      console.error('The email address is invalid.');
      return new Response('The email has to be a valid email address.', { status: 400 });
    }

    await sendEmailToSalesDepartment(name, source, phoneNumber, email, additionalInformation, env);
    await sendEmailToSender(name, email, env);
    return new Response('Success', { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(`An unexpected error occurred: ${error}`, { status: 500 });
    }
  }
};