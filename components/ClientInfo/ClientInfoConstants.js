import clients from "../../public/assests/Images/clients.png";
import mobile from "../../public/assests/Images/apps.png";
import taxInflation from "../../public/assests/Images/tax.png";
import rates from "../../public/assests/Images/adjustable.png";
export const ClientInfo = [
    {
        href: '/clientInformtion/clientPlans',
        title: 'Clients and Plans',
        img: clients,
    },
    {
        href: '/',
        title: 'Mobile Sync',
        // visible: true,
        img: mobile,
    },
    {
        href: '/clientInformtion/taxandInflation',
        title: 'Tax and Inflation',
        img: taxInflation,
    },
    {
        href: '/clientInformtion/returnRates',
        title: 'Rates of Return',
        img: rates,
    },
    {
        href: '/clientInformtion/clientContacts',
        title: 'Client Contacts',
        img: clients,
    },
    {
        href: '/custom_components',
        title: 'Custom Components',
        img: clients,
    },
]; 