import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/componentes/ButtonSendSticker'
import appRestrict from '../restrict.json'

const supabaseClient = createClient(appRestrict.SUPABESE_URL, appRestrict.SUPABESE_ANON_KEY);

function atualizaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaSupabase) => {
            //console.log(respostaSupabase.new);
            adicionaMensagem(respostaSupabase.new)
        })
        .subscribe();
}

export default function ChatPage() {
    // Sua lógica vai aqui
    const user = appConfig.username
    const [mensagem, setMensagem] = React.useState('');
    const [listaMensagem, setListaMensagem] = React.useState([
        {
            id: 1,
            de: "msgimgload",
            texto: 'msgimgload',
        }

    ]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                //console.log('Dados da consulta: ', data);
                setListaMensagem(data)
            });

        atualizaMensagensEmTempoReal((novaMensagem) => {
            //console.log('atualizaMensagensEmTempoReal')
            setListaMensagem((valorAtualDaLista) => {
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        })
    }, []);

    const handleNovaMensagem = (novaMensagem) => {
        if (novaMensagem) {
            const mensagem = {
                //id: listaMensagem.length + 1,
                de: user,
                texto: novaMensagem,

            };

            supabaseClient
                .from('mensagens')
                .insert([
                    mensagem
                ])
                .then(({ data }) => {
                    console.log('Dados da consulta: ', data);

                });

            setMensagem('');
            //console.log(event);
        }
    }

    const copy = () => {
        var content = mensagem;
        navigator.clipboard.writeText(content)
            .then(() => {
                setMensagem('texto copiado')
                setTimeout(() => {
                    setMensagem('');
                }, 80);

            })
            .catch(erro => {
                console.log(erro);
            })
    }

    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: appConfig.theme.images['minato'],
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                backgroundPosition: 'center',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals['fundoDivPrincipal'],
                    border: '1px solid rgba(0,255,0,0.1)',
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals['fundoDivPrincipal'],
                        border: '1px solid rgba(0,255,0,0.3)',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {/* <MessageList mensagens={[]} /> */}
                    <MessageList mensagens={listaMensagem} setMensagens={setListaMensagem} />
                    {/* teste: {listaMensagem.map((msgAtual) => {
                        return(
                            <li key={msgAtual.id}>
                                {msgAtual}
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'block',
                            alignItems: 'center',
                            paddingTop: '5px',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);

                                //console.log(event);
                            }}
                            onKeyPress={(event) => {
                                const tecla = event;
                                if (tecla.key === "Enter" && tecla.shiftKey == false) {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                } else if (event.key === "Enter" && event.shiftKey == true) {
                                }


                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                focus: {
                                    border: '1px solid',
                                    borderColor: appConfig.theme.colors.primary['myColor'],
                                }
                            }}
                        />
                        <Box
                            styleSheet={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "right",
                                alignItems: 'center',
                                paddingTop: '5px',
                            }}
                        >
                            <Button
                                onClick={() => {
                                    handleNovaMensagem(mensagem);
                                }}
                                styleSheet={{
                                    width: '60px',
                                    height: '40px',
                                    position: 'relative',
                                    top: "0",
                                    transform: 'translate(0,-5px)',
                                    margin: '0 5px'
                                }}
                                type='button'
                                label='Enviar'
                                fullWidth
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary['btnHover'],
                                    mainColorLight: appConfig.theme.colors.primary[400],
                                    mainColorStrong: appConfig.theme.colors.primary['myColor'],
                                }}
                            />
                            <Button
                                onClick={copy}
                                styleSheet={{
                                    width: '60px',
                                    height: '40px',
                                    position: 'relative',
                                    top: "0",
                                    transform: 'translate(0,-5px)',
                                    margin: '0 5px',
                                }}
                                type='button'
                                label='Copiar'
                                fullWidth
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: 'green',
                                    mainColorLight: appConfig.theme.colors.primary[400],
                                    mainColorStrong: appConfig.theme.colors.primary['800'],
                                }}
                            />
                            <ButtonSendSticker
                                onStickerClick={(sticker) => {
                                    //console.log('teste: ' + sticker)
                                    handleNovaMensagem(`:sticker:${sticker}`)
                                }}
                            />


                        </Box>


                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    const [infos, setInfos] = React.useState({
        followers: '---', repositories: '---',
        avatar: '----', name: '----', following: '----'
    });
    const [showdata, setShowData] = React.useState(false);
    const findUser = (mensagem) => {

        fetch(`${appRestrict.api}${mensagem.de}`)
            .then(async (retorno) => {
                if (retorno.status === 200) {
                    let data = await retorno.json()
                    setInfos({ followers: data.followers, repositories: data.public_repos, avatar: data.avatar_url, name: data.name, following: data.following })
                    setShowData(true);
                } else {
                    console.log('teste');
                }
            })
    }

    function deleteMessage(mensagem) {

        if (mensagem.de == appConfig.username) {

            //console.log(mensagem.id)
            supabaseClient
                .from('mensagens')
                .delete()
                .match({ id: mensagem.id })
                .then(({ data }) => {
                    const messageListFiltered = props.mensagens.filter((messageFiltered) => {
                        return messageFiltered.id != data[0].id
                    })
                    props.setMensagens(messageListFiltered)
                })
        }
    }

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                overflowX: 'hidden',
            }}
        >
            {/* Percorrer as mensagens */}
            {props.mensagens.map((mensagem) => {

                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px 15px 6px 6px',
                            marginBottom: '12px',
                            backgroundColor: appConfig.theme.colors.neutrals[900],
                            width:'fit-content',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        {/* logica para imagem de loading */}
                        {mensagem.texto == 'msgimgload' ?
                            (
                                <Box
                                    styleSheet={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'black',
                                        overflow: 'hidden',
                                        position: 'absolute',
                                        justifyContent: 'center',
                                        top: '0',
                                        left: '0',
                                    }}
                                >
                                    <Image
                                        styleSheet={{
                                            width: '50%',
                                            position: 'relative',
                                            margin: '0 auto',
                                        }}

                                        src={"https://i.gifer.com/79e3.gif"} />
                                </Box>) : ''}
                        {/* Fim logica para imagem de loading */}
                        <Box
                            onClick={() => {
                                deleteMessage(mensagem);
                            }}
                            styleSheet={{
                                marginBottom: '8px',
                                width: 'fit-content',
                                height: 'auto',
                                padding: '4px 8px',
                                position: 'relative',
                                float: 'right',
                                opacity: '50%',
                                borderRadius: '50%',
                                hover: {
                                    cursor: 'pointer',
                                    backgroundColor: appConfig.theme.colors.neutrals[400],
                                    opacity: '100%',
                                    color: 'white',
                                }
                            }}
                        >   {/* logica para imagem de loading */}
                            {mensagem.texto == 'msgimgload' ?
                                ''
                                : 'x'
                            }</Box>
                        {/* Fim logica para imagem de loading */}
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: "flex",
                            }}
                        >
                            <Image
                                onMouseMove={() => {
                                    findUser(mensagem)
                                }}
                                onMouseLeave={() => {
                                    setShowData(false)
                                }}
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                    hover: {
                                        cursor: 'pointer',
                                    },
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            {showdata == true ?
                                (
                                    <DadosDosUsuarios infos={infos} />

                                )
                                : (
                                    ''
                                )}


                            <Text tag="strong"
                                styleSheet={{
                                    margin: '0 10px',
                                    hover: {
                                        cursor: 'pointer',
                                        color: appConfig.theme.colors.neutrals[400],
                                    }
                                }}
                            >

                                <a href={appRestrict.imgGit +  mensagem.de} target={'_blank'} style={{textDecoration: 'none', color: 'white'}}>
                                    {mensagem.de}
                                    </a>
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    marginTop: '2px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/* logica para carregar sticker */}
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image
                                    styleSheet={{
                                        maxHeight: '100px',
                                    }}

                                    src={mensagem.texto.replace(':sticker:', '')} />
                            )
                            : (
                                <Text
                                    styleSheet={{
                                        marginTop: '20px',
                                        paddingLeft: '5px',
                                        color: appConfig.theme.colors.neutrals[100],
                                    }}
                                    tag="span"
                                >
                                    {mensagem.texto}

                                </Text>
                            )}

                    </Text>
                )

            })}

        </Box>
    )
}

function DadosDosUsuarios(props) {
    const infos = props.infos
    return (
        <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'row',
                width: 'fit-content',
                minWidth:'300px',
                minHeight: '170px',
                position: 'fixed',
                top: '2%',
                left: '3%',
                backgroundColor: 'orange',
                border: '4px solid #ccc',
                paddingRight: '30px',
                paddingBottom: '15px'
            }}
        >

            <Image
                styleSheet={{
                    maxHeight: '12vh',
                    maxWidth: '12vh',
                    margin: '20px',
                    borderRadius: '50%',
                    border:'2px solid #ccc'
                }}

                src={`${infos.avatar}`} />
            <Text
                styleSheet={{
                    margin: '20px 0',
                    position: 'relative',
                    height: 'fit-content',
                    color: 'black',
                }}
                tag="span"
            >
                <p style={{ backgroundColor: 'rgb(40,40, 40)', padding:'4px 8px', borderRadius:'15px', color:'white' }}>Seguidores: {infos.followers}</p><p style={{ backgroundColor: 'rgb(40,40, 40)', padding:'4px 8px', borderRadius:'15px', color:'white', marginTop: '3px' }}>Seguindo: {infos.following}</p><p style={{ backgroundColor: 'rgb(40,40, 40)', padding:'4px 8px', borderRadius:'15px', color:'white', marginTop: '3px' }}>Repositorios: {infos.repositories}</p>

            </Text>
            <Text
                styleSheet={{
                    margin: '12px 15px',
                    padding:'4px 8px', 
                    borderRadius:'15px',
                    position: 'absolute',
                    top: '15.1vh',
                    color: 'white',
                    backgroundColor: 'rgb(40,40, 40)'
                }}
                tag="span"
            >
                Nome: {infos.name}
            </Text>

        </Box>
    )

}
