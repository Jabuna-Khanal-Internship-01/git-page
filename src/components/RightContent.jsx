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
      search: '',
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
    return (

      this.state.repos.map((repo) => (
        <>
          <div className="repository__repo">{repo.name}
            <li>{repo.language}</li></div>
        </>
      ))
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
    console.warn(key)
  }


  render() {

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
          <select className="list">
            <option value="About">All</option>
            <option value="About">Public</option>
            <option value="Completed">Private</option>
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









