import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Header() {
    return (
        <header>
            <Link to="/">
                <div className="mayak" style={{ display: 'flex', alignItems: 'center' }}>
                    <img width={344} height={200} src="/img/logo2.jpg" />
                    <div className="headerInfo">
                        <h3>Театр красный факер имении</h3>
                        <h3>Билли Херрингтона</h3>
                    </div>
                </div>
            </Link>

            <Navbar style={{padding:10, marginTop:20, fontSize:25}} bg="black" variant="dark">
                <Container>
                    <Navbar.Brand ></Navbar.Brand>
                    <Nav className="me-auto" style={{display: 'flex', flexDirection: 'column'}}>
                        <Nav.Link style={{marginBottom:10}} href="/achievements">Награды актёров</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/actor-playing-roles">Роли актёров</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/actor-tour">Гастроли актёров</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/actors">Актёры</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/authors">Авторы</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/countries">Страны</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/date_of_tour">Дата туров</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/date_of_playing">Расписание представлений</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/date_performance">date_performance</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/performances">Представления</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/directors">Директоры театра</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/employees">Работники театра</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/employee_type">Виды работников театра</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/genders">Гендеры</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/genres">Жанры</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/roles">Роли</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/ticket_number">Билет на представление</Nav.Link>
                        <Nav.Link style={{marginBottom:10}} href="/tickets">Билеты</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />

        </header>
    )
}

export default Header