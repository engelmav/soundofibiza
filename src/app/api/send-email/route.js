import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, date } = await request.json();

    if (!name || !email || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Sound of Ibiza <rentals@soundofibiza.com>', // Change this to your "from" address
      to: ['vincent.engelmann1@gmail.com'],
      subject: 'New Speaker Rental Request',
      html: `
        <h1>New Rental Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Rental Date:</strong> ${date}</p>
      `,
    });

    if (error) {
      console.error({ error });
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
} 