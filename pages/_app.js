function GlobalStyle() {

    return (
        <style global jsx>{`
            *   {
                   margin: 0;
                   padding: 0;
                   box-sizing: border-box;
                   list-style: none;
            }
            body{
                font-family: 'Open Sans', sans-serif;
            }
            /*App fit Height*/
            html, body, #__next{
                min-height: 100vh;
                display: flex;
                flex: 1;
            }
            #__next{
                flex: 1;
            }
            #__next > *{
                flex: 1;
            }
            ::-webkit-scrollbar {
                width: 10px;               /* width of the entire scrollbar */
              }
              
              ::-webkit-scrollbar-track {
                background: rgba(255,255,255,0.1);        /* color of the tracking area */
              }
              
             ::-webkit-scrollbar-thumb {                 
                background-color: rgba(255,255,255,0.5);    /* color of the scroll thumb */
                border-radius: 10px;       /* roundness of the scroll thumb */
                thumb */
              }
            /* ./App fit height */
                
            `}
        </style>
    )
}

export default function MyApp({ Component, pageProps}){
    
    return (
        <>
        <GlobalStyle />
        <Component {...pageProps} />
        </>
    )
}