import { navbar as NavBar } from "./components/navbar/navbar";

import "./index.css";

// react router: biblioteca de rotas para as páginas de um site e tornar o desenvolvimento muito mais simples e escalável.
import {
	BrowserRouter as Router,
	Routes,
	Route,
  } from 'react-router-dom'
import CadastroUsuario from "./components/forms/cadastroUsuario/CadastroUsuario";

function App() {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<Routes>
					<Route path="/cadastrousuario" element={<CadastroUsuario />} />
				</Routes>
					
			</Router>
		</div>
	);
}

export default App;
