import { PowerShell } from 'node-powershell';
import inquirer from 'inquirer';

//Imports

//Setup and configure app


const ps = new PowerShell({
    executionPolicy: 'Bypass',
    noProfile: true
});

inquirer
  .prompt([
    {
      name: 'commande',
      message: '>>>',
    },
  ])
  .then(answers => {
    if (answers.commande === 'lp') {
      const cmd = PowerShell.command`Get-Process`
      const hey = ps.invoke(cmd)
        .then(response => {
            ps.dispose()
	    console.log(response.stdout.toString())
        })
        .catch(err => {
            //res.json(err)
          console.log(err)
        });
      }


    if (answers.commande.substr(0,4) === 'run ') {
      var path;
      if (answers.commande.substr(4)==='vs code'){
        path=`"C:/Users/Utilisateur/AppData/Local/Programs/Microsoft VS Code/Code.exe"`
      }
      if (answers.commande.substr(4)==='chrome'){
        path=`""C:/Program Files/Google/Chrome/Application/chrome.exe""`
      }
      else{
        path=answers.commande.substr(4)
      }
      const cmd = PowerShell.command`Start-Process `+path
      const hey = ps.invoke(cmd)

        .catch(err => {
            //res.json(err)
          console.log(err)
        });
    }

    if (answers.commande.substr(0,8) === 'bing -k '){
      var p_id= answers.commande.substr(8).toString()

      const cmd = PowerShell.command`Stop-Process -ID `+p_id+` -Force`
      const hey = ps.invoke(cmd)

        .catch(err => {
            //res.json(err)
          console.log(err)
        });
    }

    else{
      console.info('Answer:', answers.commande);
    }
    console.log('ici')
  });
