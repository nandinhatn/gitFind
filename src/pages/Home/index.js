import {useState} from 'react';
import {Header} from '../../components/Header';
import './styles.css';
import background from "../../assets/github-background.png";
import ItemList from '../../components/itemList'

function App() {
 const [user, setUser]=useState('')
 const [currentUser, setCurrentUser] = useState(null)
 const [repos, setRepos] = useState(null)
 
const handleGetData = async ()=>{
  const userData = await fetch(`https://api.github.com/users/${user}`);
  const newUser = await userData.json();
  
  if(newUser.name){
    const {avatar_url, name, bio,login}= newUser;
    console.log(newUser.avatar_url)
    setCurrentUser({avatar_url,name,bio, login})
    
    const reposData  = await fetch(`https://api.github.com/users/${user}/repos`);
    const newRepos = await reposData.json();
    console.log(newRepos)
    if(newRepos.length){
      setRepos(newRepos)
    }

  }
}

  return (
    <div className="App">
    <Header> 
       </Header>
    <div className='conteudo'>
  
     <div className='info'>

      <div>
        <input name='usuario' value={user} onChange={event => setUser(event.target.value)} placeholder='@username'></input>
        <button onClick={handleGetData}>Buscar</button>
      </div>
    {currentUser?.name ? (
    <>
   <div className='perfil'>
   <img src= {currentUser.avatar_url} className='profile' alt='foto perfil'/> 
   <div>
   <h3> {currentUser.name}</h3>
   <span>@{currentUser.login}</span>
   <p>{currentUser.bio}</p>
 </div>      
 </div>
<hr/></>
    ): null}
     
    {repos?.length ? (<>

     
      <div className='repositorio'> <h4>Repositórios</h4>
     

     {repos.map(repo =>(  
     <ItemList title={repo.name} description= {repo.description}/> 
     ))}
  
    
   
   
     <hr/>
      </div>
    
    </>): null}
    
 
     </div>
    </div>
 
  
    </div>
  );
}

export default App;
