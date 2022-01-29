import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import appRestrict from '../restrict.json'

function Title(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag}{
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 24px;
                    font-weight: 600;
                }

            `}
            </style>
        </>
    )
}


//componente react
// function HomePage() {
//     return (
//         <div>
//             <GlobalStyle/>
//             <Title tag="h1">Boas vindas de volta!</Title>
//             <h2>Discord - Alura Matrix</h2>

//             <style jsx>{`
//                 h2 {
//                     color: ${appConfig.theme.colors.neutrals['000']};
//                 }
//             `}
//             </style>


//         </div>

//     )
// }
//export default HomePage



export default function PaginaInicial() {
    const api_Git = 'https://api.github.com/users/';
    const router = useRouter();

    const [username, setUsername] = React.useState('');
    const [nameImg, setNameimg] = React.useState('github');
    const [validar, setValidar] = React.useState();
    const [data, setData] = React.useState({ followers: '---', repositories: '---' });
    const [nameTemp, setnameTemp] = React.useState('empty');

    const [title, setTitulo] = React.useState('');
    const text = 'Boas vindas de volta!';

    React.useEffect(() => {

        if (title.length < text.length) {
            let count = title.length
            setTimeout(() => {

                setTitulo((title) => title + text[count]);
                //console.log(titulo) 
            }, 65);
        }
    });

    const notFound = () => {
        setData({ followers: '---', repositories: '---' })
        setNameimg('github');
        setValidar(false);
        setnameTemp('Not Found');
    }

    const checkImg = (valor) => {

        fetch(`${api_Git}${valor}`)
            .then(async (retorno) => {
                if (retorno.status === 200) {
                    let infos = await retorno.json()
                    setData({ followers: infos.followers, repositories: infos.public_repos })
                    setNameimg(valor);
                    setValidar(true);
                    setnameTemp(valor);
                } else {
                    notFound();
                }
            })
            .catch(function (err) {
                //console.log('Fetch Error :-S', err);
                notFound();
            });
    }

    const validarUsuario = (event) => {
        const valor = event.target.value;
        //trocar o estado da variável

        setUsername(valor);
        appConfig.username = valor;

        if (valor.length > 2) {
            checkImg(valor);
        } else {
            setData({ followers: '---', repositories: '---' })
            notFound();
        }

    }

    const login = (event) => {
        event.preventDefault();

        if (validar) {
            validarSenha();
        } else {
            alert('Usuário inválido');
        }

    }

    const [senha, setSenha] = React.useState(false);
    function validarSenha() {
        if (appConfig.username.toLowerCase() == "edinaldofcs") {
            var senha = prompt('senha: ');
            senha == appRestrict.senha ?
                router.push('/chat')
                : setSenha(true)
        } else {
            setSenha(false)
            router.push('/chat');
        }
    }

    return (
        <>
            {/* Box de validação do meu usuário */}
            {senha ? (
                <Box
                    style={{ zIndex: '999' }}
                    styleSheet={{
                        width: '90%',
                        height: '90%',
                        backgroundColor: 'black',
                        position: 'fixed',
                        transform: 'translate(5%, 5%)',
                        boxShadow: '0px 0px 5px 0px white',
                        textAlign:'center'
                    }}

                >
                    <Text variant="body3"
                        onClick={() => {
                            setSenha(false)
                        }}
                        styleSheet={{
                            marginBottom: '32px',
                            color: 'white',
                            height: 'fit-content',
                            width: 'fit-content',
                            fontSize: '26px',
                            cursor: 'pointer',
                            position:'relative',
                            float:'right',
                            marginRight:'10px',
                        }}
                    >
                        x
                    </Text>
                    <Image
                        styleSheet={{
                            height: '50%',
                            position:'relative',
                            left:'50%',
                            top:'50%',
                            transform:'translate(-50%,-50%)'
                        }}

                        src={'https://static.wikia.nocookie.net/2867db19-4840-46c3-a0a0-2a6e9c124b70'} />
                </Box>
            ) : ''}
            {/* Fim Box de validação do meu usuário */}

            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary['MybackgroundColor'],
                    backgroundImage: appConfig.theme.images['guy'],
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                    backgroundPosition: 'center',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '8px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 1px ' + appConfig.theme.colors.primary['myColor'],
                        backgroundColor: appConfig.theme.colors.neutrals['fundo'],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={login}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',

                        }}
                    >
                        <Title tag="span">
                            <img src='https://cdn.colab55.com/images/5501/studio/109891/art/229505/stickers.png'
                                style={{ width: '15px' }} />
                            {title}
                            <img src='https://cdn.colab55.com/images/5501/studio/109891/art/229505/stickers.png'
                                style={{ width: '15px' }} />
                        </Title>
                        <br />
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300], fontSize: '16px' }}>
                            {appConfig.name}
                        </Text>

                        {/* <input 
                            type="text"
                            value={username}
                            onChange={(event)=>{
                                console.log(event);
                                //similar ao addEventListener
                                const valor = event.target.value;
                                //trocar o estado da variável
                                setUsername(valor);
                                valor? setNameimg(valor):
                                setNameimg('github')
                            }}
                        /> */}
                        <TextField
                            value={username}
                            onChange={validarUsuario}
                            placeholder='Usuário Github'
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}

                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary['btnHover'],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary['myColor'],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals['fundoDivPrincipal'],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.primary['btnHover'],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`https://github.com/${nameImg}.png`}
                        />
                        <Box
                            styleSheet={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1px',
                                flex: 1,
                            }}
                        >
                            <Text
                                variant="body4"
                                styleSheet={{
                                    color: appConfig.theme.colors.neutrals[200],
                                    backgroundColor: appConfig.theme.colors.neutrals[900],
                                    padding: '1px 10px',
                                    borderRadius: '1000px'
                                }}
                            >
                                usuário: {nameTemp}
                            </Text>
                            <Text
                                variant="body4"
                                styleSheet={{
                                    color: appConfig.theme.colors.neutrals[200],
                                    backgroundColor: appConfig.theme.colors.neutrals[900],
                                    padding: '3px 10px',
                                    borderRadius: '1000px',
                                    marginTop: '8px'
                                }}
                            >
                                seguidores: {data.followers}
                            </Text>
                            <Text
                                variant="body4"
                                styleSheet={{
                                    color: appConfig.theme.colors.neutrals[200],
                                    backgroundColor: appConfig.theme.colors.neutrals[900],
                                    padding: '3px 10px',
                                    borderRadius: '1000px',
                                    marginTop: '8px'
                                }}
                            >
                                repositórios: {data.repositories}
                            </Text>
                        </Box>
                    </Box>
                    {/* Photo Area */}

                </Box>
            </Box>
        </>
    );
}