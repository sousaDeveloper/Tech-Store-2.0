import ContentFooter from "./ContentFooter";
import Separator from "./Separator";

const Footer = () => {
  return (
    <footer className="flex flex-col text-secondaryColor px-5 mt-14 sm:mt-24 md:mt-32 gap-5 bg-gradient-footer sm:px-8 xl:px-16">
      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-10 xl:mx-[5rem] 2xl:mx-[12rem]">
        <div className="flex flex-col">
          <ContentFooter
            title="Receba Ofertas Exclusivas"
            description="Assine nossa newsletter e receba descontos e promoções diretamente no
            seu e-mail!"
          />

          <div className="flex gap-5 items-center mt-2">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Digite seu email.."
              autoComplete="off"
              className="rounded-md flex justify-end p-2 w-[14rem] bg-background text-secondaryColor pr-8"
            />
            <button className="bg-gradient rounded-lg px-4 py-2">
              Assinar
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <ContentFooter
            title="Fale Conosco"
            description="Tem alguma dúvida? Entre em contato com nossa equipe pelo e-mail
          devlpsousa@gmail.com ou pelo telefone (45)99836-5461."
          />
        </div>
        <div className="flex flex-col">
          <ContentFooter
            title="Acompanhe-nos"
            description="Siga-nos nas redes sociais e não perca nenhuma oportunidade. Fique por
          dentro das novidades, promoções e lançamentos!"
          />
        </div>
        <div className="flex flex-col">
          <ContentFooter
            title="Formas de Pagamento"
            description="Aceitamos diversos meios de pagamento para tornar sua experiência
          ainda mais prática."
          />
        </div>
      </div>

      <Separator />
      <h2 className="text-base sm:text-lg text-center md:w-[80%] lg:w-[50%] pb-5 mx-auto">
        <span className="text-primaryColor font-bold">Tech Store</span> | Todos
        os direitos reservados | Política de Privacidade | Termos e Condições
      </h2>
    </footer>
  );
};

export default Footer;
