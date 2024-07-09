import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-center pt-20">
      <ul className="flex flex-col gap-4">
        <li>
          <Link className="font-bold text-2xl underline" href="/">
            /
          </Link>
        </li>
        <li>
          <Link className="font-bold text-2xl underline" href="/test">
            /test
          </Link>
        </li>
        <li>
          <Link className="font-bold text-2xl underline" href="/tag">
            /tag
          </Link>
        </li>
      </ul>
    </nav>
  );
}
