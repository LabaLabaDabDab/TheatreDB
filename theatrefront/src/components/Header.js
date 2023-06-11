import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <Link to="/">
                <div className="theatre" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="headerInfo">
                        <img width={340} height={200} src="/img/logo2.jpg" alt="Логотип" />
                        <h3>Театр красный факер имении Билли Херрингтона</h3>
                    </div>
                </div>
            </Link>
            <Navbar style={{ padding: 20, marginTop: 0, fontSize: 20 }} bg="black" variant="dark">
                <Container>
                    <Navbar.Brand></Navbar.Brand>
                    <Nav className="me-auto" style={{ display: 'flex', flexDirection: 'column' }}>
                        <Nav.Link style={{ marginBottom: 0 }} href="/request">Запросы</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/achievements">Звания актёров</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/actors">Актёры</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/actor_playing_role">Актёры и их роли</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/actor_tour">Актёры и их туры</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/authors">Авторы</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/countries">Страны</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/date_of_playing">Даты проведения</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/date_of_tour">Дата туров</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/date_of_performance">Даты представлений</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/directors">Директоры</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/employees">Работники театра</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/employees_type">Типы работников театра</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/genders">Гендеры</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/genres">Жанры</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/musicians">Музыканты</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/performances">Представления</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/producers">Продюсеры</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/producers-performances">Продюсеры и представления</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/roles">Роли</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/tickets">Билеты</Nav.Link>
                        <Nav.Link style={{ marginBottom: 0 }} href="/ticket_number">Номера билетов</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />
        </div>
    );
}

export default Header;