/* eslint-disable no-console */
interface ContactForm {
  name: string;
  email?: string;
  phoneNumber: string;
  source: string;
  additionalInformation?: string;
}

export const onRequest: PagesFunction = async ({ request }) => {
  console.log('Request received from contact form.', { IPAddress: request.headers.get('CF-Connecting-IP'), method: request.method });

  // if (request.method !== 'POST') {
  //   console.error('Method not allowed', { method: request.method });
  //   return new Response('Method not allowed', { status: 405 });
  // }

  // console.log('Extracting contact form data from request body...');
  // const { name, email, phoneNumber, source, additionalInformation } = await request.json<ContactForm>();
  // console.log('Extracted contact form data.', { name, email, phoneNumber, source, additionalInformation });

  // if (name == null || phoneNumber == null || source == null) {
  //   console.error('Missing required fields');
  //   return new Response('Missing required fields', { status: 400 });
  // }

  // console.log('Sending email to sales department...');
  // new Request('https://api.mailchannels.net/tx/v1/send', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     personalizations: [{
  //       to: [{ email: 'sales@rayneswayblinds.com', name: 'Raynesway Blinds Sales Department' }],
  //     }],
  //     from: { email, name },
  //     subject: 'Website Appointment Request Submission',
  //     content: [{
  //       type: 'text/plain',
  //       value: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nSource: ${source}\nAdditional Information:\n${additionalInformation}`,
  //     }],
  //   }),
  // });
  // console.log('Email sent to sales department.');
  return new Response('Success', { status: 200 });
};