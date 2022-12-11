import {useTranslation, withTranslation} from "react-i18next";

import {NAME} from './constants';
import instance from "./instance";

/**
 * INTERNATIONALIZATION MODULE
 *
 * Stores messages and exposes them via selector.
 * Also, stores date formats.
 *
 * There is no support for switching yet, but it should be quite simple to add.
 *
 */
const translate = {
    NAME,
    addTranslations: (language, translations) => instance.addResourceBundle(language, 'translation', translations, true, false),
    useTranslation: () => {
        const {t} = useTranslation();
        return t;
    },
    withTranslation,
};
export default translate;
