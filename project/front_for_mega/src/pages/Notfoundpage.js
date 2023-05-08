import React from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../hooks/use-localstorage";
import i18n from '../i18n';
const Notfoundpage = () => {
    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');
    return (
        <div>
            {t('NotFoundPage')}
        </div>
    );
};

export default Notfoundpage;