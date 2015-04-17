import React from 'react';
import Slab from '../shared/slab';

export default React.createClass({
    render() {
        return (
            <Slab>
                <form>
                    <div className="row setting">
                        <div className="small-6 medium-8 columns">
                            <label htmlFor="greenbox-id" className="inline">Dummy configuration</label>
                        </div>
                        <div className="small-6 medium-4 columns">
                                <button className="button radius">Add</button>
                        </div>
                    </div>
                </form>
            </Slab>
        );
    }
});