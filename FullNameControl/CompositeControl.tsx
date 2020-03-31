import * as React from 'react';
import { TextField, Callout, Stack, Label, PrimaryButton, DirectionalHint, ITextFieldStyleProps, ITextFieldStyles, ILabelStyles, IButtonStyles } from 'office-ui-fabric-react';

export interface IName {
    firstName: string;
    middleName: string;
    lastName: string;
}

export interface ICompositeControlProps extends IName {
    fullName: string;
    firstNameLabel: string;
    middleNameLabel: string;
    lastNameLabel: string;
    onNameChanged: (name: IName) => void;
}

interface ICompositeControlState extends IName {
    isCalloutVisible: boolean
}

export default class CompositeControl extends React.Component<ICompositeControlProps, ICompositeControlState>{

    constructor(props: ICompositeControlProps) {
        super(props);

        this.state = {
            isCalloutVisible: false,
            firstName: props.firstName,
            middleName: props.middleName,
            lastName: props.lastName
        };
    }

    private _menuButtonElement = React.createRef<HTMLDivElement>();

    private showPopup = () => {
        this.setState({
            isCalloutVisible: true
        });
    }

    private hidePopup = () => {
        this.setState({
            isCalloutVisible: false
        });
    }

    private onNameChanged = () => {
        const name: IName = {
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName
        };

        this.props.onNameChanged(name);
    }

    render() {
        const textFieldStyle = (props: ITextFieldStyleProps): Partial<ITextFieldStyles> => ({
            ...(
                props.focused ? {
                fieldGroup: {
                    border: "none",
                    selectors: {
                        ":after": {
                            border: "none"
                        }
                    }
                },
                field: {
                    border: "1px solid rgb(102, 102, 102)",
                    fontFamily: "SegoeUI,'Segoe UI'",
                }
            }: {
                fieldGroup: {
                    border: "none",
                    selectors: {
                        ":after": {
                            border: "none"
                        },
                        ":hover": {
                            border: "1px solid rgb(102, 102, 102)"
                        }
                    }
                },
                field: {
                    fontWeight: 600,
                    fontFamily: "SegoeUI,'Segoe UI'",
                    selectors: {
                        ":hover": {
                            fontWeight: 400
                        }
                    }
                }
            })
        });

        const labelStyle: Partial<ILabelStyles> = {
            root: {
                fontWeight: 400
            }
        };

        const buttonStyle: Partial<IButtonStyles> = {
            root: {
                width: "6rem",
                minWidth: "6rem",
                backgroundColor: "#3B79B7",
                selectors: {
                    ":hover": {
                        backgroundColor: "#2F5F90"
                    }
                }
            }
        };

        return (
            <>
                <div ref={this._menuButtonElement}>
                    <TextField
                        value={this.props.fullName}
                        readOnly={true}
                        onClick={this.showPopup}
                        placeholder={"---"}
                        styles={textFieldStyle}
                    />
                    {this.state.isCalloutVisible && (
                        <Callout
                            target={this._menuButtonElement.current}
                            onDismiss={this.hidePopup}
                            directionalHint={DirectionalHint.rightCenter}
                        >
                            <Stack horizontal>
                                <Stack tokens={{childrenGap: 14, padding: 10}}>
                                    <Label 
                                        styles={labelStyle}
                                    >{this.props.firstNameLabel}</Label>
                                    <Label 
                                        styles={labelStyle}
                                    >{this.props.middleNameLabel}</Label>
                                    <Label
                                        styles={labelStyle}
                                    >{this.props.lastNameLabel}</Label>
                                </Stack>
                                <Stack tokens={{ childrenGap: 10, padding: 10 }} horizontalAlign="end">
                                    <TextField
                                        value={this.state.firstName}
                                        placeholder={"---"}
                                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                                            this.setState({
                                                firstName: newValue ?? ""
                                            }, this.onNameChanged);
                                        }}
                                        styles={textFieldStyle}
                                    />
                                    <TextField
                                        value={this.state.middleName}
                                        placeholder={"---"}
                                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                                            this.setState({
                                                middleName: newValue ?? ""
                                            }, this.onNameChanged);
                                        }}
                                        styles={textFieldStyle}
                                    />
                                    <TextField
                                        value={this.state.lastName}
                                        placeholder={"---"}
                                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                                            this.setState({
                                                lastName: newValue ?? ""
                                            }, this.onNameChanged);
                                        }}
                                        styles={textFieldStyle}
                                    />
                                    <PrimaryButton
                                        text={"Done"}
                                        onClick={this.hidePopup}
                                        styles={buttonStyle}
                                    />
                                </Stack>
                            </Stack>
                        </Callout>
                    )}
                </div>
            </>
        );
    }
}