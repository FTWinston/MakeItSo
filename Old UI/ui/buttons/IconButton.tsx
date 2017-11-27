type Icon = 'refresh' | 'settings' | 'close' | 'help' | 'pause' | 'next' | 'prev' | 'helm' | 'warp' | 'weapons' | 'sensors' | 'power' | 'damage' | 'comms' | 'view';
interface IIconButtonProps {
    icon: Icon;
    className?: string;
    title?: string;
    clicked?: () => void;
}

class IconButton extends React.Component<IIconButtonProps, {}> {
    render() {
        switch (this.props.icon) {
            case 'refresh':
                return this.renderRefresh();
            case 'settings':
                return this.renderSettings();
            case 'close':
                return this.renderClose();
            case 'help':
                return this.renderHelp();
            case 'pause':
                return this.renderPause();
            case 'next':
                return this.renderNext();
            case 'prev':
                return this.renderPrev();
            case 'helm':
                return this.renderHelm();
            case 'warp':
                return this.renderWarp();
            case 'weapons':
                return this.renderWeapons();
            case 'sensors':
                return this.renderSensors();
            case 'power':
                return this.renderPower();
            case 'damage':
                return this.renderDamage();
            case 'comms':
                return this.renderComms();
            case 'view':
                return this.renderViewscreen();
        }
    }
    private getClasses() {
        return this.props.className === undefined ? 'icon' : 'icon ' + this.props.className;
    }
    private renderRefresh() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <polyline points="1 4 1 10 7 10"/>
            <polyline points="23 20 23 14 17 14"/>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
        </svg>
    }
    private renderSettings() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeMiterlimit="10"/>
        </svg>
    }
    private renderClose() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
    }
    private renderHelp() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12" y2="8"/>
        </svg>
    }
    private renderPause() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16"/>
            <rect x="14" y="4" width="4" height="16"/>
        </svg>
    }
    private renderNext() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <polygon points="5 4 15 12 5 20 5 4"/>
            <line x1="19" y1="5" x2="19" y2="19"/>
        </svg>
    }
    private renderPrev() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <polygon points="19 20 9 12 19 4 19 20"/>
            <line x1="5" y1="19" x2="5" y2="5"/>
        </svg>
    }

    private renderHelm() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
        </svg>
    }
    private renderWarp() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
    }
    private renderWeapons() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <line x1="22" y1="12" x2="18" y2="12"/>
            <line x1="6" y1="12" x2="2" y2="12"/>
            <line x1="12" y1="6" x2="12" y2="2"/>
            <line x1="12" y1="22" x2="12" y2="18"/>
        </svg>
    }
    private renderSensors() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
    }
    private renderPower() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
            <line x1="12" y1="2" x2="12" y2="12"/>
        </svg>
    }
    private renderDamage() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12" y2="17"/>
        </svg>
    }
    private renderComms() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
    }
    private renderViewscreen() {
        return <svg onClick={this.props.clicked} title={this.props.title} className={this.getClasses()} role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
    }
}