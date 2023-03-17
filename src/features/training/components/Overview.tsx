import { Link } from 'react-router-dom'

export const Overview: React.FC = () => {
    return (
        <div>
            This is the training section.<br/>
            Here you can run practice versions of the game in isolation, without any crewmates.

            <ul>
                <li><Link to="helm">Helm</Link></li>
                <li><Link to="engineering">Engineering</Link></li>
            </ul>
        </div>
    );
}