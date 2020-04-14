export const TESTMode = false;
export const version = "3.0.2"
export const serverID = '392414185633611776';
export const channelsTC = {
    'reglas': {
        idTC: '509680096915750913',
        roles: ['']
    }, 'comandos': {
        idTC: '674086159697313833',
        roles: ['457666332402647041', '673222890673668156', '691370234078298132', '674080985733791754']
    }, 'shuxestado': {
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
        roles: ['674397839098642433', '684103645050306565', '683438860750815345']
    }, 'dev': {
        idTC: '675061892863098890',
        roles: ['457666332402647041', '673222890673668156', '674080985733791754']
    }, 'ciervos': {
        idTC: '676117952461930499',
        roles: ['675075371481169922']
    }, 'tickets': {
        category: '686615400317976587',
        roles: ['674397839098642433', '684103645050306565', '683438860750815345']
    }, 'vicioroom': {
        idTC: '552980788539424779',
        category: '552537250718547999',
        vicioVC: '552543499212554242',
        roles: ['457666332402647041', '474020722235146250', '673222890673668156', '510572522366959647', '470069464180981761', '675185892276699141', '675185839772270612', '675185783673454622', '675185738815373312', '675185689872039946', '675185648466133052', '675185597589225502']
    },  'staff': {
        category: '686615400317976587',
        idTC: '676117952461930499',
        roles: ['457666332402647041', '673222890673668156', '510572522366959647']
    } 
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
export const rolPenitencia = '675715236870881320';
export const rolNoRules    = '694011168305709096';
export const LVLs: Array<{ minLvl: number; maxLvl: number; roleLVL: string }> = [
    { minLvl: 0,   maxLvl: 5,   roleLVL: '674086387510673414' },
    { minLvl: 5,   maxLvl: 10,  roleLVL: '675185452931874836' },
    { minLvl: 10,  maxLvl: 15,  roleLVL: '675185597589225502' },
    { minLvl: 15,  maxLvl: 20,  roleLVL: '675185648466133052' },
    { minLvl: 20,  maxLvl: 25,  roleLVL: '675185689872039946' },
    { minLvl: 25,  maxLvl: 30,  roleLVL: '675185738815373312' },
    { minLvl: 30,  maxLvl: 35,  roleLVL: '675185783673454622' },
    { minLvl: 35,  maxLvl: 40,  roleLVL: '675185839772270612' },
    { minLvl: 40,  maxLvl: 50,  roleLVL: '675185892276699141' },
    { minLvl: 50,  maxLvl: 75,  roleLVL: '699262270982586448' },
    { minLvl: 75,  maxLvl: 100, roleLVL: '699262346538909808' },
    { minLvl: 100, maxLvl: 150, roleLVL: '699262436112597002' },
    { minLvl: 150, maxLvl: 200, roleLVL: '699262653830398012' }
];