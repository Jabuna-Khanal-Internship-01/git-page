import React, { Component } from 'react'


const tabs = {
  overView: 'Overview',
  repo: 'Repositories',
  project: 'Projects',
  package: 'Packages',
}



export default class RightContent extends Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      status: [],
      activeTab: '',
      searchText: '',
      filteredRepos: [],
      selectedVisibility:'',
    };

    this.tabArray = [
      {
        name: tabs.overView,
        onClick: () => {
          console.log('Overview')
        }
      },
      {
        name: tabs.repo,
        onClick: this.handleRepoClick
      },
      {
        name: tabs.project,
        onClick: this.handleProjectClick
      },
      {
        name: tabs.package,
        onClick: this.handlePackageClick
      }
    ]
  }


  componentDidMount() {
    this.fetchRepo();
  }

  fetchRepo = async () => {
    const response = await fetch(' https://api.github.com/users/jabuna07/repos')
    const data = await response.json()
    this.setState({
      repos: data,
    });
  };



  getRepoView = () => {
    const result = (this.state.searchText==='')? this.state.repos: this.state.filteredRepos
    return (

      result.map((repo) => (
        <div className="repository__repo">{repo.name}
          <li>{repo.language}</li></div>
      )
      )
    )
  }




  getContentView = () => {
    console.log(this.state.activeTab)
    if (this.state.activeTab == tabs.repo) {
      return (this.getRepoView());
    } else { return 'Nothing to show' }
  }


  handleOverViewClick = () => {
    this.setState({ activeTab: tabs.overView })
  }

  handleRepoClick = () => {
    this.setState({ activeTab: tabs.repo })

  }

  handleProjectClick = () => {
    this.setState({ activeTab: tabs.project })
  }


  handlePackageClick = () => {
    this.setState({ activeTab: tabs.package })
  }


  search(key) {
    console.log(key);
    const filteredResult = this.state.repos.filter((repo) => {
      let visibility =true;
      if(this.state.selectedVisibility === 'Public'){
       visibility =!repo.private
      } else if(this.state.selectedVisibility ==='Private'){
        visibility = repo.private
      }else{}
  
      return repo.name.includes(key) && visibility;

    });
    console.log(filteredResult,'---------------')
    this.setState({ filteredRepos: filteredResult, searchText:key })

  }

  handleVisibilitySelect =(event) =>{
    
    console.log()
    this.setState({selectedVisibility:event.target.value})
  }

  render() {
    console.log(this.state.repos,'=====')
    return (
      <>
        <div className="content-right">
          {this.tabArray.map((tab) => {
            console.log(tab);
            return <button onClick={tab.onClick}>{tab.name}</button>
          })}
        </div>

        <div className="searchBar" >
          <input type="text" placeholder="Find a repo" onChange={(e) => this.search(e.target.value)} />
          <select className="list" onChange ={this.handleVisibilitySelect}>
            <option value="All">All</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          <select className="list">
            <option value="About">All</option>
            <option value="Completed">Html</option>
            <option value="Completed">Scss</option>
            <option value="Completed">Javascript</option>
          </select>
        </div>

        <div className="repository">
          {this.getContentView()}
        </div>

      </>
    )
  }
}









