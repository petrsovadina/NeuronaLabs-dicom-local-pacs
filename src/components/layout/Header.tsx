import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            Zdravotnický Systém
          </Link>
          <div className="space-x-4">
            <Link href="/pacienti" className="text-gray-600 hover:text-gray-900">
              Pacienti
            </Link>
            <Link href="/vysetreni" className="text-gray-600 hover:text-gray-900">
              Vyšetření
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
