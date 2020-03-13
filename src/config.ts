export const config = {
    "token": "NjczNjU1MTExMDQxNTQ4Mjg4.XjjUsw.tAK-_N4nXddPgUKImPxOD8Y9yrU",
    "prefix": "?"
};
export const firebaseConfig = {
    apiKey: "AIzaSyBf2fNRsyU5ycUd17mddWsoEcXLghFcZ0Y",
    authDomain: "shuxserver.firebaseapp.com",
    databaseURL: "https://shuxserver.firebaseio.com",
    projectId: "shuxserver",
    storageBucket: "shuxserver.appspot.com",
    messagingSenderId: "870136584235",
    appId: "1:870136584235:web:10c665fc574d8c7645726e"
};
export const db = {
    user: 'shuxbot@discord.bot.io',
    pass: 'BJM&83TqEe5E&BwzfsUejPdGsGhM$a'
};
export const TESTMode: boolean = false;
export const serverID = '392414185633611776';
export const channelsTC = {
    'shuxestado': {
        idTC: '683095482012008500',
        roles: ['674088910024081441'],
        msg: ['683497971836256276', '684092742405718050', '684092743802290194', '684092745232416829']
    }, 'warnings': {
        idTC: '675344555511382040',
        roles: ['457666332402647041', '474020722235146250', '673222890673668156', '510572522366959647']
    }, 'entrevista': {
        idTC: '674408701125459968',
        roles: ['457666332402647041', '474020722235146250', '673222890673668156', '510572522366959647']
    }, 'sugerencia': {
        idTC: '673212666210287657',
        roles: ['457666332402647041', '474020722235146250', '673222890673668156', '510572522366959647']
    }, 'consulta': {
        idTC: '674045015084761127',
        roles: ['683438860750815345', '674397839098642433', '683437732173053975']
    }, 'tecnicos': {
        idTC: '680223692076089355',
        roles: ['683438860750815345', '674397839098642433', '683437732173053975']
    }, 'dev': {
        idTC: '675061892863098890',
        roles: ['457666332402647041', '673222890673668156', '674080985733791754']
    }, 'ciervos': {
        idTC: '676117952461930499',
        roles: ['675075371481169922']
    }, 'tickets': {
        category: '686615400317976587',
        roles: ['683438860750815345', '674397839098642433', '683437732173053975']
    }, 'vicioroom': {
        idTC: '552980788539424779',
        category: '552537250718547999',
        vicioVC: '552543499212554242',
        roles: ['457666332402647041', '474020722235146250', '673222890673668156', '510572522366959647', '470069464180981761', '675185892276699141', '675185839772270612', '675185783673454622', '675185738815373312', '675185689872039946', '675185648466133052', '675185597589225502']
    }, 
};
export const listaErr = {
    'votoRep': {
        code: 'ErrXRepVoto',
        info: 'Ya fue votado'
    }, 'votoMulti': {
        code: 'ErrXVotoMulti',
        info: 'No se puede votar más de tres usuarios'
    }, 'votoMe': {
        code: 'ErrXVotoMe',
        info: 'No se puede votar asi mismo'
    }
};
export const listaPass = {
    'voto': {
        code: 'PassXVoto',
        info: 'Su voto fue cargado'
    }
} ;
export const LVLs: Array<{ minLvl: number; maxLvl: number; roleLVL: string }> = [
    { minLvl: 0,  maxLvl: 5,   roleLVL: '674086387510673414' },
    { minLvl: 5,  maxLvl: 10,  roleLVL: '675185452931874836' },
    { minLvl: 10, maxLvl: 15,  roleLVL: '675185597589225502' },
    { minLvl: 15, maxLvl: 20,  roleLVL: '675185648466133052' },
    { minLvl: 20, maxLvl: 25,  roleLVL: '675185689872039946' },
    { minLvl: 25, maxLvl: 30,  roleLVL: '675185738815373312' },
    { minLvl: 30, maxLvl: 35,  roleLVL: '675185783673454622' },
    { minLvl: 35, maxLvl: 40,  roleLVL: '675185839772270612' },
    { minLvl: 40, maxLvl: 500, roleLVL: '675185892276699141' },
];