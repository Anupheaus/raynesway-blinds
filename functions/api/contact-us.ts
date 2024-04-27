interface Env {
  KV: KVNamespace;
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  const { KV } = env;

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { name, email, message } = await request.json<ContactForm>();

  if (!name || !email || !message) {
    return new Response('Missing required fields', { status: 400 });
  }

  await KV.put(`contact-${Date.now()}`, JSON.stringify({ name, email, message }));

  return new Response('Success', { status: 200 });
};