import * as React from 'react';
import { connect, WithCerebral } from 'app/fluent';

import Margin from 'common/components/spacing/Margin';
import Input from 'common/components/Input';
import Button from 'app/components/Button';

import { WorkspaceSubtitle, WorkspaceInputContainer } from '../elements';

import { Container, Error } from './elements';

class CreateRepo extends React.Component<WithCerebral> {
    updateRepoTitle = (e) => {
        this.props.signals.git.repoTitleChanged({ title: e.target.value });
    };

    createRepo = () => {
        this.props.signals.git.createRepoClicked();
    };

    render() {
        const { store } = this.props;
        const modulesNotSaved = !store.editor.isAllModulesSynced;
        const repoTitle = store.git.repoTitle;
        const error = store.git.error;

        return (
            <div>
                <Container margin={1} top={0.5}>
                    Export Sandbox to GitHub
                </Container>
                {modulesNotSaved && <Error>Save your files first before exporting.</Error>}
                {error && <Error>{error}</Error>}

                <WorkspaceSubtitle>Repository Name</WorkspaceSubtitle>
                <WorkspaceInputContainer>
                    <Input onChange={this.updateRepoTitle} value={repoTitle} />
                </WorkspaceInputContainer>
                <Margin horizontal={1} bottom={1}>
                    <Button
                        disabled={Boolean(error) || !repoTitle || modulesNotSaved}
                        onClick={this.createRepo}
                        block
                        small
                    >
                        Create Repository
                    </Button>
                </Margin>
            </div>
        );
    }
}

export default connect()(CreateRepo);