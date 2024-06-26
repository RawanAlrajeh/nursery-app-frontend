import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { pathname, asPath, query } = router;

  useEffect(() => {
    document.body.className = i18n.language === 'ar' ? 'rtl' : '';
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      router.push({ pathname, query }, asPath, { locale: lng });
    });
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>English</button>
      <button onClick={() => changeLanguage('ar')} disabled={i18n.language === 'ar'}>العربية</button>
    </div>
  );
};

export default LanguageSwitcher;
