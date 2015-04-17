import React from 'react';
import Slab from '../shared/slab';

export default React.createClass({
    render() {
        return (
            <Slab>
                <form>
                    <div className="row setting">
                        <div className="small-6 medium-8 columns">
                            <label htmlFor="greenbox-id" className="inline">Greenbox ID:</label>
                        </div>
                        <div className="small-6 medium-4 columns">
                            <label name="greenbox-id" className="inline"><strong>118</strong></label>
                        </div>
                    </div>

                    <div className="row setting">
                        <div className="small-6 medium-8 columns">
                            <label htmlFor="version" className="inline">System Version:</label>
                        </div>
                        <div className="small-6 medium-4 columns">
                            <label name="version" className="inline"><strong>2.0.0</strong></label>
                        </div>
                    </div>

                    <div className="row setting">
                        <div className="small-6 medium-8 columns">
                            <label htmlFor="ui-version" className="inline">UI Version:</label>
                        </div>
                        <div className="small-6 medium-4 columns">
                            <label name="ui-version" className="inline"><strong>1.0.0</strong></label>
                        </div>
                    </div>
                </form>
            </Slab>
        );
    }
});