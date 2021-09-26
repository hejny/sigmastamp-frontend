import * as React from 'react';
import styled from 'styled-components';

export type IUploadZoneProps = React.PropsWithChildren<{
    clickable?: boolean;
    onFilesOver?: (isFileOver: boolean) => void;
    onFiles: (droppedFiles: File[]) => void;
}>;

// TODO: !!! Use hooks and functional coponent ONLY in whole project

export class UploadZone extends React.Component<IUploadZoneProps> {
    render() {
        const {
            children,
            onFiles: onFile,
            onFilesOver: onFileOver,
            clickable,
        } = this.props;
        const onFileOverMaybe = (isFileOver: boolean) => {
            if (onFileOver) {
                onFileOver(isFileOver);
            }
        };

        let uploadClick: () => void;

        return (
            <UploadZoneDiv
                onClick={() => {
                    if (clickable) {
                        uploadClick();
                    }
                }}
                onDragEnter={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                }}
                onDragOver={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    onFileOverMaybe(true);
                }}
                onDragExit={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    onFileOverMaybe(false);
                }}
                onDragEnd={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                }}
                onDrop={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onFileOverMaybe(false);

                    const files = Array.from(event.dataTransfer.files); // TODO: Maybe there should be event.dataTransfer.items handler
                    onFile(files);
                }}
            >
                <input
                    type="file"
                    ref={(element) => {
                        if (element) {
                            uploadClick = () => {
                                onFileOverMaybe(true);
                                (element as HTMLInputElement).click();
                            };
                        }
                    }}
                    onChange={(event) => {
                        if (!event || !event.target || !event.target.files)
                            return;
                        onFile(Array.from(event.target.files));
                    }}
                />

                {children}
            </UploadZoneDiv>
        );
    }
}

const UploadZoneDiv = styled.div`
    width: ${210}px;
    height: ${297}px;
    padding: 10px;
    border: 5px dashed #009edf;

    input {
        display: none;
    }
`;
