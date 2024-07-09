import RefreshButton from '@/components/refresh-button';
import RevalidateTagButton from '@/components/revalidate-button';

export default async function Home() {
  const res = await fetch('http://worldtimeapi.org/api/timezone/Europe/Oslo', {
    next: {
      tags: ['datetime'],
    },
  });
  const data = await res.json();
  const datetime = data.datetime;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8">
      <RefreshButton />
      <h1>
        Norwegian datetime from worldtimeapi.org:{' '}
        <span className="font-bold">{datetime}</span>
      </h1>
      <div className="mt-12 flex flex-col gap-4 items-center">
        <h4 className="text-xl">
          Testing out{' '}
          <span className="font-bold">{'revalidateTag("datetime")'}</span> to
          purge the fetch cache
        </h4>
        <RevalidateTagButton route="/tag" />
      </div>
    </main>
  );
}
