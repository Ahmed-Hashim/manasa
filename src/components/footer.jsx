// import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <div>
            <h4 className="text-lg font-semibold mb-4">من نحن</h4>
            <p className="text-gray-400 w-1/3">
              مركز الانتخابات ملتزم بتعزيز عملية ديمقراطية شفافة
              ومستنيرة. نوفر منصة للمرشحين لمشاركة رؤيتهم وللناخبين
              لاتخاذ قرارات مدروسة.
            </p>
          </div>
          {/* <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/candidates" className="text-gray-400 hover:text-white">
                  المرشحون
                </Link>
              </li>
              <li>
                <Link href="/view-programs" className="text-gray-400 hover:text-white">
                  البرامج الانتخابية
                </Link>
              </li>
              <li>
                <Link href="/add-program" className="text-gray-400 hover:text-white">
                  تقديم برنامج
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-400 hover:text-white">
                  الملف الشخصي
                </Link>
              </li>
              <li>
                <Link href="/admin/review" className="text-gray-400 hover:text-white">
                  مراجعة البرامج (الإدارة)
                </Link>
              </li>
            </ul>
          </div> */}
          <div>
            <h4 className="text-lg font-semibold mb-4">اتصل بنا</h4>
            <p className="text-gray-400">
              123 شارع الديمقراطية
              <br />
              القاهرة
              <br />
              مصر
            </p>
            <p className="text-gray-400 mt-2">
              البريد الإلكتروني: info@electionhub.com
              <br />
              الهاتف: 0123456789
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} مركز الانتخابات. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
