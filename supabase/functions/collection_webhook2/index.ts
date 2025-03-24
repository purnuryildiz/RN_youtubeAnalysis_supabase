import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
console.log('Hello from Webhook!');

Deno.serve(async (req) => {
  try {
    console.log('Webhook received!');
    const data = await req.json();
    console.log('Raw data received:', JSON.stringify(data, null, 2));
    const snapshot_id = req.headers.get('snapshot-id');
    console.log('snapshot_id:', snapshot_id);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    //save channel to database
    const { data: channel, error } = await supabase.from('yt_channels').insert(
      data.map((item: any) => ({
        id: item.id,
        url: item.url,
        handle: item.handle,
        banner_img: item.banner_img,
        profile_image: item.profile_image,
        name: item.name,
        subscribers: item.subscribers,
        videos_count: item.videos_count,
        created_date: item.created_date,
        views: item.views,
        Description: item.Description,
        location: item.Details?.location,
      }))
    );
    console.log('channel', channel);
    console.log('error', error);

    //update scrape_jobs table status to "ready"
    await supabase.from('scrape_jobs').update({ status: 'ready' }).eq('id', snapshot_id);

    return new Response(JSON.stringify({ status: 'ok' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
