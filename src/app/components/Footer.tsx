import Separator from "./Separator";

const Footer = () => {
  return (
    <footer className="flex flex-col text-secondaryColor px-5 mt-14 gap-5 bg-gradient-footer">
      <div className="flex flex-col">
        <h1 className="text-xl">Receba Ofertas Exclusivas</h1>
        <p className="text-sm opacity-60">
          Assine nossa newsletter e receba descontos e promoções diretamente no
          seu e-mail!
        </p>
        <div className="flex gap-5 items-center mt-2">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Digite seu email.."
            autoComplete="off"
            className="rounded-md flex justify-end p-2 w-[14rem] bg-background text-secondaryColor pr-8"
          />
          <button className="bg-gradient rounded-lg px-4 py-2">Assinar</button>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl">Fale Conosco</h1>
        <p className="text-sm opacity-60">
          Tem alguma dúvida? Entre em contato com nossa equipe pelo e-mail{" "}
          devlpsousa@gmail.com ou pelo telefone {"(45)"} 99836-5461
        </p>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl">Acompanhe-nos</h1>
        <p className="text-sm opacity-60">
          Siga-nos nas redes sociais e não perca nenhuma oportunidade. Fique por
          dentro das novidades, promoções e lançamentos!
        </p>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl">Formas de Pagamento</h1>
        <p className="text-sm opacity-60">
          Aceitamos diversos meios de pagamento para tornar sua experiência
          ainda mais prática.
        </p>
      </div>
      <Separator />
      <h2 className="text-md text-center pb-5">
        <span className="text-primaryColor font-bold">Tech Store</span> | Todos
        os direitos reservados | Política de Privacidade | Termos e Condições
      </h2>
    </footer>
  );
};

export default Footer;
