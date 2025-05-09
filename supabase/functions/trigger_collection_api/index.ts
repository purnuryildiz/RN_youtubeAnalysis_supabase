import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

Deno.serve(async (req) => {
  const { url } = await req.json();

  console.log('url:', url);
  const response = await fetch(
    `https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lk538t2k2p1k3oos71&endpoint=${Deno.env.get('SUPABASE_URL')}/functions/v1/collection_webhook2&format=json&uncompressed_webhook=true&include_errors=true`,
    {
      headers: {
        Authorization: `Bearer ${Deno.env.get('BRIGHT_DATA_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify([{ url }]),
    }
  );
  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Failed to trigger collection' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const data = await response.json();

  //store job data in supabase
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  );
  const result = await supabase.from('scrape_jobs').insert({
    id: data.snapshot_id,
    status: 'running',
  });
  console.log('result', result);

  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/trigger_collection_api' \
    --header 'Authorization: Bearer YOUR_SUPABASE_ANON_KEY' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
