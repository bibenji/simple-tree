import React, { Component } from 'react';

const closedStyle = {
    display: 'none'
};

const openStyle = {
    display: 'block'
};

class SimpleTree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            resourcesInArray: null,
            foldersStates: null,
			foldersOpened: true,
			classes: {
				mainContainer: 'redBackground',
				ul: '',
				li: '',
				liDiv: '',
				
				
			}
        };
    }

    componentDidMount() {        
		let futurState = null;
		
        if (this.props.resources) {			
			futurState = this.makeObjectOfResources(this.props.resources);            
        }
		
		console.log(futurState);
		
        this.setState({
            resourcesInArray: futurState.resourcesAsObject,
            foldersStates: futurState.foldersStates,
            loaded: true
        });		
    }
	
	makeObjectOfResources(resources) {		
		let foldersStates = {};
		let resourcesAsObject = {
			content: []
		};
		
		resources.forEach((resource) => {			

			const partsOfPath = resource.path.split("/");

			let actualObject = resourcesAsObject;

			partsOfPath.forEach((part, i) => {								
				
				// si c'est la fin on stocke la resource
				if (i+1 == partsOfPath.length) {
					actualObject.content.push(resource);
				}
								
				// si le dossier pas enregistré, on créer un nouvel objet
				// et on le sélectionne
				else if (!actualObject[part]) {					
					actualObject[part] = {
						content: []
					};
					
					foldersStates[part] = this.state.foldersOpened;
										
					actualObject = actualObject[part];
				}

				// si le dossier déjà enregistré, on ne créer rien de nouveau
				// et on sélectionne ce dosser
				else if (actualObject[part]) {
					actualObject = actualObject[part];
				}

				else {
					console.log('probleme');
				}				
				
			});
			
		});		
		
		return {
			resourcesAsObject: resourcesAsObject,
			foldersStates: foldersStates
		};
	}

    openOrCloseFolder(treeNode) {
        let emptyObject = {};
        emptyObject[treeNode] = !this.state.foldersStates[treeNode];
        const newFoldersStates = Object.assign({}, this.state.foldersStates, emptyObject);

        this.setState({
           foldersStates: newFoldersStates
        });
    }

    getTree(tree) {

        let files = null;

        let content = (

            <div className={this.state.classes.mainContainer}>
                <ul className={this.state.classes.ul}>

                    {Object.keys(tree).map((key, i) => {

                        if (key !== 'content'
                            && key !== 'state'
                            && key !== '__proto__' && !Array.isArray(tree[key])) {

                            return (
                                <li className={this.state.classes.li} key={i}>
                                    <div className={this.state.classes.liDiv}>                                        
										{!this.state.foldersStates[key] ?
											<i className="material-icons" onClick={() => this.openOrCloseFolder(key)}>folder</i>
										:
											<i className="material-icons" onClick={() => this.openOrCloseFolder(key)}>folder_open</i>} {key}<br />
										<div style={this.state.foldersStates[key] ? openStyle : closedStyle}>
											{this.getTree(tree[key])}
										</div>                                        
                                    </div>
                                </li>
                            );

                        } else if (key === 'content') {
                            if (tree[key].length > 0) {
                                files = (
                                    <li className={this.state.classes.li} key={i}>
                                        <ul style={{ padding: '0'}}>
                                            {tree[key].map((resource, j) => (
                                                <li className={this.state.classes.li} key={j}>
													<div className={this.state.classes.liDiv}>                                                                                            
														<i className="material-icons align-middle">insert_drive_file</i> {resource.name}
													</div>                                                    
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                );
                            }
                        }
                    })}

                    {files}

                </ul>
            </div>

        );

        return content;
    }

    render() {

        return (
            <div className="resource-tree">

                {this.state.loaded ?
                    <div>
                        <h3>Tree</h3>
                        {this.getTree(this.state.resourcesInArray)}
                    </div>
                    :
                    <div>Loading...</div>
                }

            </div>
        );

    }

}

export default SimpleTree;