import { styled } from '@mui/material/styles';
import { Component } from 'react';
import { Translation } from 'react-i18next';

interface Props {
    className?: string;
    hideError?: boolean;
}

interface State {
    hasError: boolean;
}

const ErrorMessage = styled('h1')(({ theme }) => ({
    color: theme.palette.error.main,
    padding: '1em',
}));

/**
 * Ensures that any errors don't break the whole app.
 * If an error occurs in a child of this component,
 * this component will render an error message,
 * but the rest of the app will not be affected.
 */
export class ErrorBoundary extends Component<React.PropsWithChildren<Props>, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: unknown) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Optionally log the error here.
        // This already shows in console.error in development mode.
    }

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        if (this.props.hideError) {
            return null;
        }

        // Note we can't use the more streamlined useTranslation hook since this is a class-based component not a functional component.
        return (
            <Translation>
                {(t) => <ErrorMessage className={this.props.className}>{t('common:error')}</ErrorMessage>}
            </Translation>
        );
    }
}
