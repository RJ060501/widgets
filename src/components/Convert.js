//https://cloud.google.com/translate/docs/reference/rest/v2/translate
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
    const [translated, setTranslated] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);

    useEffect(() => {
        //set timer to update 'debouncedText' in 500ms
        const timerId = setTimeout(() => {
            setDebouncedText(text);
        }, 500);

        //return a cleanup function that cancels this timer
        return() => {
            clearTimeout(timerId);
        }
    }, [text]);

    useEffect(() => {
        const doTranslation = async () => {
            //destructure out result to just get data
            const { data } = await axios.post(
                //not going to change in any number of years...
                'https://translation.googleapis.com/language/translate/v2',
            {},
            {
                params: {
                    q: debouncedText,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                },
            });

            setTranslated(data.data.translations[0].translatedText);
        };

        doTranslation();
    }, [language, debouncedText]);

    return (
        <div>
            <h1 className="ui header">{translated}</h1>
        </div>
    );
};

export default Convert;