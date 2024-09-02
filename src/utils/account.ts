import alphaicon from '../assets/images/icons/alphaicon.png';
import betaicon from '../assets/images/icons/betaicon.png';
import alpha2packicon from '../assets/images/icons/alpha2packicon.png';
import alpha4packicon from '../assets/images/icons/alpha4packicon.png';
import beta2packicon from '../assets/images/icons/beta2packicon.png';
import beta4packicon from '../assets/images/icons/beta4packicon.png';
import devicon from '../assets/images/icons/devicon.png';
import wolficon from '../assets/images/icons/wolficon.png';
import kickstartericon from '../assets/images/icons/kickstartericon.png';
import paxicon from '../assets/images/icons/paxicon.png';
import slgicon from '../assets/images/icons/slgicon.png';
import bugicon from '../assets/images/icons/bugicon.png';
import whitehaticon from '../assets/images/icons/whitehaticon.png';
import tigericon from '../assets/images/icons/tigericon.png';
import { AuthenticatedUser } from './authentication';
type Icon = {
    name: string;
    file: string;
}
export function getIcon(selectedIcon: string | null, icon: string): string {
    if (selectedIcon) return selectedIcon;

    const icons = getIcons(icon);

    return icons.length ? icons.pop()!.file : 'standardicon';
}

export function getIcons(icon: string): Icon[] {
    const arr = icon.split(';');
    if (!arr) return [];

    const icons: Icon[] = [];

    arr.forEach(icon => {
        switch (icon) {
            case 'alphaicon':
                icons.push({ name: 'Alpha', file: alphaicon });
                break;
            case 'betaicon':
                icons.push({ name: 'Beta', file: betaicon });
                break;
            case 'alpha2packicon':
                icons.push({ name: 'Alpha 2 Pack', file: alpha2packicon });
                break;
            case 'alpha4packicon':
                icons.push({ name: 'Alpha 4 Pack', file: alpha4packicon });
                break;
            case 'beta2packicon':
                icons.push({ name: 'Beta 2 Pack', file: beta2packicon });
                break;
            case 'beta4packicon':
                icons.push({ name: 'Beta 4 Pack', file: beta4packicon });
                break;
            case 'devicon':
                icons.push({ name: 'Developer', file: devicon });
                break;
            case 'wolficon':
                icons.push({ name: 'Wolf', file: wolficon });
                break;
            case 'kickstartericon':
                icons.push({ name: 'Kickstarter', file: kickstartericon });
                break;
            case 'paxicon':
                icons.push({ name: 'PAX', file: paxicon });
                break;
            case 'slgicon':
                icons.push({ name: 'SLG', file: slgicon });
                break;
            case 'bugicon':
                icons.push({ name: 'Bug', file: bugicon });
                break;
            case 'whitehaticon':
                icons.push({ name: 'White Hat', file: whitehaticon });
                break;
            case 'tigericon':
                icons.push({ name: 'White Tiger', file: tigericon });
                break;
            default:
                break;
        }
    });

    return icons;
}

export async function downloadVersion(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const href = event.currentTarget.href;

    try {
        const response = await fetch(href, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AuthenticatedUser()}`
            }
        });

        if (response.ok) {
            const presignedUrl = await response.text(); // Assuming the server returns the URL as plain text
            if (presignedUrl) {
                window.open(presignedUrl, '_blank'); // Open the presigned URL in a new tab
            } else {
                console.error('Presigned URL not found');
            }
        } else {
            console.error('Download failed with status:', response.status);
        }
    } catch (error) {
        console.error('Download failed:', error);
    }
}