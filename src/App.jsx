import React, {Component} from 'react';
import './App.css';
import {BlockPicker, CirclePicker} from 'react-color'
import {Logo} from "./Logo";
import classNames from "classnames";

class App extends Component {

    state = {
        theme: {
            backgroundColor: '#fff',
            linkColor: '#000',
            imageColor: '#000'
        },
        isSpanColorPickerShow: false,
        isImageColorPickerShow: false,
        game: {
            start: false,
            onWheel: false,
            onWheelStopped: false,
            user1: 0,
            user2: 0,
            result: 0,
            dropCounts: 0
        }
    };

    newGame = () => this.setState({
        theme: {
            backgroundColor: '#fff',
            linkColor: '#000',
            imageColor: '#000'
        },
        isSpanColorPickerShow: false,
        isImageColorPickerShow: false,
        game: {
            start: false,
            onWheel: false,
            onWheelStopped: false,
            user1: 0,
            user2: 0,
            result: 0,
            dropCounts: 0
        }
    });

    handleChangeComplete = color => {
        this.setState({
            ...this.state,
            theme: {
                ...this.state.theme,
                backgroundColor: color.hex,
            }
        });
    };

    onSpanColorOnChangeComplete = color => {
        this.setState({
            ...this.state,
            theme: {
                ...this.state.theme,
                linkColor: color.hex
            }
        });
    };

    onImageColorOnChangeComplete = color => {
        this.setState({
            ...this.state,
            theme: {
                ...this.state.theme,
                imageColor: color.hex
            }
        });
    };

    stopWheel = (random) => {
        if (this.state.game.dropCounts % 2 === 0) {
            this.setState({
                ...this.state,
                game: {
                    ...this.state.game,
                    onWheel: false,
                    onWheelStopped: true,
                    dropCounts: this.state.game.dropCounts + 1,
                    user1: this.state.game.user1 + random
                }
            });
        } else {
            this.setState({
                ...this.state,
                game: {
                    ...this.state.game,
                    onWheel: false,
                    onWheelStopped: true,
                    dropCounts: this.state.game.dropCounts + 1,
                    user2: this.state.game.user2 + random
                }
            });
        }
        if (this.state.game.user1 >= 100) {
            alert("Player 1 is winner");
            this.newGame();
        }
        if (this.state.game.user2 >= 100) {
            alert("Player 2 is winner");
            this.newGame();
        }

    };

    render() {
        const {isSpanColorPickerShow, isImageColorPickerShow} = this.state;
        const {user1, user2, onWheel, result, onWheelStopped, start} = this.state.game;
        const {backgroundColor: color, linkColor, imageColor} = this.state.theme;
        const backgroundStyle = {backgroundColor: color};

        const imageClass = classNames(onWheel ? 'App-logo-fast' : 'App-logo');

        function getRandom() {
            return Math.floor(Math.random() * 6 + 1);
        }

        let random = 0;

        return (
            <div className="App">
                <header className="App-header" style={backgroundStyle}>
                    <CirclePicker className='circle-picker' color={color}
                                  onChangeComplete={this.handleChangeComplete}/>
                    <div className='container-logo'>
                        <div onClick={() => this.setState({
                            ...this.state,
                            isImageColorPickerShow: !isImageColorPickerShow
                        })}
                             onWheel={() => {
                                 random = getRandom();
                                 this.setState({
                                     ...this.state,
                                     game: {
                                         ...this.state.game,
                                         onWheel: true,
                                         onWheelStopped: false,
                                         result: random,
                                     }
                                 });
                             }
                             }
                             onTouchMove={() => {
                                 random = getRandom();
                                 this.setState({
                                     ...this.state,
                                     game: {
                                         ...this.state.game,
                                         onWheel: true,
                                         onWheelStopped: false,
                                         result: random,
                                     }
                                 });
                             }
                             }
                        >
                            <Logo className={imageClass} color={imageColor}/>
                        </div>
                        {isImageColorPickerShow &&
                        <BlockPicker id='imagePicker' color={imageColor}
                                     onChangeComplete={this.onImageColorOnChangeComplete}/>}
                        <span
                            onClick={() => this.setState({
                                ...this.state,
                                isSpanColorPickerShow: !isSpanColorPickerShow
                            })}
                            style={{color: linkColor, marginBottom: '10px'}}
                        >
                        Laboratory Work
                    </span>
                        {isSpanColorPickerShow &&
                        <BlockPicker id='spanPicker' color={linkColor}
                                     onChangeComplete={this.onSpanColorOnChangeComplete}/>}
                    </div>
                    <div style={{color: linkColor}}>
                        {!start && <span onClick={() => this.setState({
                            ...this.state,
                            game: {
                                ...this.state.game,
                                start: true,
                            }
                        })}>Start Game</span>}
                        {start && <div>
                        <span onClick={() => this.stopWheel(result)}
                              style={{display: 'block'}}>Dropped the Number: {result}</span>
                            <span style={{display: 'block'}}>Player 1: {this.state.game.user1}</span>
                            <span style={{display: 'block'}}>Player 2: {this.state.game.user2}</span>
                        </div>}

                    </div>
                </header>
            </div>
        );
    }

}

export default App;
