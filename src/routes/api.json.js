import db from '$lib/db.js';

export async function get() {
	const { data, error } = await db
		.from('tones4uArchive')
		.select('*')
		.eq('approved', true)
		.order('created_at', { ascending: false });

	return { status: 200, body: { data, error } };
}

export async function post({ request }) {
	const formData = await request.json();
	const { description, url } = await formData;

	const { data, error } = await db.from('tones4uArchive').insert([{ description, url }]);

	return { status: 201, data, error };
}
