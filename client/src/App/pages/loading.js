import React from 'react';
import {Spinner} from 'reactstrap';

const SpinnerPage = (props) => {
    return (
        <div class="text-center" className="loader">
            <Spinner size="md" color="light"/>{' '}
        </div>
    );
};

export default SpinnerPage;
