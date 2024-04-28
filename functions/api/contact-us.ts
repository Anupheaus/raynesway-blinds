interface ContactForm {
  name: string;
  email?: string;
  phoneNumber: string;
  source: string;
  additionalInformation?: string;
}

export const onRequest: PagesFunction = async ({ request }) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const { name, email, phoneNumber, source, additionalInformation } = await request.json<ContactForm>();

  if (name == null || phoneNumber == null || source == null) return new Response('Missing required fields', { status: 400 });

  new Request('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: 'sales@rayneswayblinds.com', name: 'Raynesway Blinds Sales Department' }],
      }],
      from: { email, name },
      subject: 'Website Appointment Request Submission',
      content: [{
        type: 'text/plain',
        value: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nSource: ${source}\nAdditional Information:\n${additionalInformation}`,
      }],
    }),
  });

  return new Response('Success', { status: 200 });
};