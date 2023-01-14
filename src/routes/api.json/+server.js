import { json as json$1 } from '@sveltejs/kit';
import db from '$lib/db.js';

export async function GET() {
	const { data, error } = await db
		.from('tones4uArchive')
		.select('*')
		.eq('approved', true)
		.order('created_at', { ascending: false });

	return json$1({ data, error });
}

export async function POST({ request }) {
	const formData = await request.json();
	const { description, url } = await formData;

	const { data, error } = await db.from('tones4uArchive').insert([{ description, url }]);

	return new Response(undefined, { status: 201 });
}
