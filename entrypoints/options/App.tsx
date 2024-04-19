import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';


function App() {
  const [project, setProject] = useState<Project>();

  return (
    <div className='m-2 flex flex-col gap-2'>
      <div id="popup-header" className='flex flex-row gap-2'>
        <h1 className="m-4">{project? project.name : "No Environment"}</h1>
      </div>
      <div id="popup-environment-container" className='flex flex-col items-center'>
        {project?.environments.map((environment) => (
          <button>{environment.name}</button>
          ))}
      </div>
    </div>
  );
}

export default App;
