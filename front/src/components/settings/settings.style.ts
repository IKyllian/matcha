import { sva } from "styled-system/css";

export const settingsStyle = sva({
    slots: [
        'title',
        'settingsContainer',
        'settingsWrapper',
        'rowInputs',
        'inputDate',
        'radioInput',
        'radioLabel',
        'radioWrapper',
        'textAreaInput',
        'button',
        'uploadButton',
        'imageResetButton',
        'profilPicturePreview',
        'profilPictureContainer',
        'filesUploadContainer',
        'picturesContainer',
        'picturesItemContainer',
        'picturesItem',
        'textInfo',
        'positionListContainer',
        'positionItem',
        'positionContainer'
    ],
    base: {
        settingsContainer: {
            width: '80%',
            margin: '30px auto 30px auto',
            padding: '24px',
            border: '2px solid black',
            boxShadow: '2.5px 2.5px 0 black',
        },
        title: {
            fontWeight: 'bold',
            fontSize: '24px',
            textAlign: 'center',
            marginBottom: '12px'
        },
        settingsWrapper: {
            height: 'fit-content',
            display: 'flex',
            flexDir: 'column',
            gap: '16px',
            '& > label': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: '8px',
                fontSize: '18px',
                fontWeight: '600',
                '& > *': {
                    fontWeight: 'normal'
                },
                '& > input': {
                    border: '2px solid black',
                    padding: '8px'
                }
            }
        },
        rowInputs: {
            display: 'flex',
            gap: '8px',
            '& > label': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: '8px',
                fontSize: '18px',
                fontWeight: '600',
                '& > *': {
                    fontWeight: 'normal'
                },
                '& > input': {
                    border: '2px solid black',
                    padding: '8px'
                }
            }
        },
        radioWrapper: {
            display: 'flex',
            gap: '8px',
        },
        radioLabel: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '4px',
            fontSize: '16px'
        },
        inputDate: {
            width: '150px',
            border: '2px solid black',
            padding: '4px',
            colorScheme: 'black',
        },
        radioInput: {
            width: 'fit-content'
        },
        textAreaInput: {
            border: '2px solid black',
            padding: '8px'
        },
        button: {
            width: '300px',
            height: '50px',
            border: '2px solid black',
            boxShadow: '2.5px 2.5px 0 black',
            backgroundColor: 'buttonPrimaryBackground',
            borderRadius: '7px',
            fontWeight: '500',
            fontSize: '20px',
            margin: '12px auto 0 auto',
            _active: {
                boxShadow: 'none',
            }
        },
        uploadButton: {
            border: '2px solid black',
            boxShadow: '2.5px 2.5px 0 black',
            width: '30px',
            height: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            "& > svg": {
                margin: 'auto'
            },
        },
        imageResetButton: {
            backgroundColor: '#f38d8d',
            "& > svg": {
                color: 'red'
            },
        },
        profilPicturePreview: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '2px solid black',
            "& > img": {
                width: '100%',
                height: '100%',
                borderRadius: '50%',
            }
        },
        profilPictureContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            width: 'fit-content',
            '& > label': {
                fontSize: '18px',
                fontWeight: '600',
                '& > *': {
                    fontWeight: 'normal'
                }
            }
        },
        filesUploadContainer: {
            display: 'flex',
            flexDir: 'column',
            textAlign: 'center',
            padding: '24px',
            gap: '8px',
            border: '2px solid black',
            boxShadow: '2.5px 2.5px 0 black',
            width: '250px',
            '& > span': {
                fontSize: '20px',
                fontWeight: 500
            },
            '& > svg': {
                margin: '0 auto'
            }
        },
        picturesContainer: {
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
        },
        picturesItemContainer: {
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
        },
        picturesItem: {
            width: '150px',
            height: '150px',
            borderRadius: '5px',
            border: '2px solid black',
            cursor: 'pointer',
            "& > img": {
                width: '100%',
                height: '100%',
            }
        },
        textInfo: {
            fontSize: '12px'
        },
        positionContainer: {
            position: 'relative'
        },
        positionListContainer: {
            position: 'absolute',
            top: '84px',
            display: 'flex',
            flexDir: 'column',
            backgroundColor: 'white',
            width: '100%',
        },
        positionItem: {
            padding: '8px 4px',
            '&:hover': {
                backgroundColor: '#dce2f7'
            },
            '&[data-border="1"]': {
                borderBottom: '1px solid black'
            },
        }
    }
})