import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import { SocialList } from "../components/SocialList";

export default function Index() {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <div className="container">
        <div>
          <h1>
            Välkommen till <span className="fancy">BRF Vindöga</span>
          </h1>
          <span className="handle"> - med havet som granne 🌅</span>
          <p>
            Vindöga ligger i Malmös mest spännande stadsdel, Västra Hamnen, där Malmö möter Öresund, längst ut vid havet.
            Utanför dörren hittar du både härliga badmöjligheter, restauranger, butiker och stora grönområden och stränder.
            Det är lätt att ta sig till Vindöga, antingen med bussen som stannar precis utanför eller med cykel.
            Lägenheterna är ovanligt rymliga och ljusa med stora fönsterpartier.
          </p>
          <SocialList />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          padding: 0 1.5rem;
        }
        h1 {
          font-size: 2.5rem;
          margin: 0;
          font-weight: 500;
        }
        p {
          font-weight: 400;
          line-height: 1.25;
          max-width: 760px;
        }
        .fancy {
          color: teal;
        }
        .handle {
          display: inline-block;
          margin-top: 0.275em;
          color: #9b9b9b;
          letter-spacing: 0.05em;
        }

        @media (min-width: 769px) {
          h1 {
            font-size: 3rem;
          }
          p {
            max-width: 890px;
          }
        }
      `}</style>
    </Layout>
  );
}
