import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-10">
      <p className="text-sm font-bold uppercase tracking-widest text-amber-600">شوفلاي</p>
      <h1 className="mt-3 text-4xl font-bold text-stone-900">منصة الخدمات المتكاملة</h1>
      <p className="mt-3 max-w-2xl text-stone-600 leading-relaxed">
        تجربة موحّدة للعملاء والموردين والمشرفين — مبنية على الكفاءة والشفافية.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <Link
          href="/client"
          className="group rounded-2xl border border-amber-100 bg-white p-6 shadow-sm transition hover:border-amber-400 hover:shadow-md"
        >
          <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-2xl group-hover:bg-amber-100">
            👤
          </div>
          <h2 className="text-xl font-bold text-stone-900">تطبيق العميل</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-500">
            الطلبات، العروض، المحفظة، التوصيل، الإشعارات.
          </p>
        </Link>

        <Link
          href="/vendor"
          className="group rounded-2xl border border-amber-100 bg-white p-6 shadow-sm transition hover:border-amber-400 hover:shadow-md"
        >
          <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-2xl group-hover:bg-amber-100">
            🏪
          </div>
          <h2 className="text-xl font-bold text-stone-900">تطبيق المورد</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-500">
            الطلبات المفتوحة، العروض، الأرباح، السحوبات.
          </p>
        </Link>

        <Link
          href="/admin"
          className="group rounded-2xl border border-amber-100 bg-white p-6 shadow-sm transition hover:border-amber-400 hover:shadow-md"
        >
          <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-2xl group-hover:bg-amber-100">
            ⚙️
          </div>
          <h2 className="text-xl font-bold text-stone-900">لوحة الإدارة</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-500">
            المراجعة، الإرسال، العروض، المستردات، السحوبات.
          </p>
        </Link>
      </div>
    </main>
  );
}
