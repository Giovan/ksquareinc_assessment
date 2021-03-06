import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    id: PropTypes.string.isRequired
};

class Modal extends Component {
    static modals = [];

    static open = (id) => (e) => {
        e.preventDefault();

        let modal = Modal.modals.find(x => x.props.id === id);
        modal.setState({ isOpen: true });
        document.body.classList.add('modal-open');
    }

    static openModal = (id) => {
        let modal = Modal.modals.find(x => x.props.id === id);
        modal.setState({ isOpen: true });
        document.body.classList.add('modal-open');
    }

    static close = (id) => (e) => {
        e.preventDefault();

        // close modal specified by id
        let modal = Modal.modals.find(x => x.props.id === id);
        modal.setState({ isOpen: false });
        document.body.classList.remove('modal-open');
    }

    static closeModal = (id) => {
        // close modal specified by id
        let modal = Modal.modals.find(x => x.props.id === id);
        modal.setState({ isOpen: false });
        document.body.classList.remove('modal-open');
    }

    constructor(props) {
        super(props);

        this.state = { isOpen: false };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // add this modal instance to the modal service so it's accessible from other components
        Modal.modals.push(this);
    }

    componentWillUnmount() {
        // remove this modal instance from modal service
        Modal.modals = Modal.modals.filter(x => x.props.id !== this.props.id);
        this.element.remove();
    }

    handleClick(e) {
        // close modal on background click
        if (e.target.className === 'modal') {
            Modal.close(this.props.id)(e);
        }
    }
    
    render() {
        return (
            <div style={{display: + this.state.isOpen ? '' : 'none'}} onClick={this.handleClick} ref={el => this.element = el}>
                <div className="modal">
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                </div>
                <div className="modal-background"></div>
            </div>
        );
    }
}

Modal.propTypes = propTypes;

export { Modal };