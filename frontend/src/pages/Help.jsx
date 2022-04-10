
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

function Help() {
  return (
    <>
      <Typography>
        <Title>Introduction</Title>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi dignissimos ducimus excepturi, ipsa
          itaque similique soluta ullam? Aliquam aut cum dolores eaque eos et eveniet hic impedit incidunt maxime modi
          nobis nulla odit perspiciatis provident quas qui, sunt vitae voluptate voluptatibus. Ad adipisci alias aliquam
          asperiores assumenda aut commodi cupiditate doloremque earum, enim esse excepturi exercitationem explicabo
          facere fuga id illum impedit in iure maiores modi molestiae nam nostrum numquam officia quidem, quisquam quod
          reprehenderit, sequi soluta tempora temporibus ullam unde vel vitae voluptates voluptatum? Alias corporis,
          cupiditate eaque, in itaque, laudantium quisquam quod reiciendis rem repellat reprehenderit tempora veritatis?
          Ab, aut beatae culpa dicta distinctio facere laborum maxime necessitatibus nisi quas sapiente, sit voluptatum.
          Accusamus ad atque autem beatae commodi consequuntur doloremque doloribus est eveniet facilis illum ipsam itaque
          molestias, necessitatibus odit perspiciatis quia quisquam quod rerum sapiente tempore ullam, ut voluptates?
          Alias aliquid blanditiis dolore doloribus eius error et eum eveniet ex fuga fugiat incidunt itaque iure
          laboriosam, laudantium libero magnam molestiae molestias
          necessitatibus neque nihil nobis nostrum, nulla obcaecati odit praesentium provident, quae quam quo reprehenderit
          sapiente sequi tenetur vitae. Alias atque debitis dolore facere hic ipsa libero, minima minus molestias, nam
          odit, ratione soluta ut?
        </Paragraph>
        <Paragraph>
          After massive project practice and summaries, Ant Design, a design language for background
          applications, is refined by Ant UED Team, which aims to <Text strong>
          uniform the user interface specs for internal background projects, lower the unnecessary
          cost of design differences and implementation and liberate the resources of design and
          front-end development</Text>.
        </Paragraph>
        <Title level={2}>Guidelines and Resources</Title>
        <Paragraph>
          We supply a series of design principles, practical patterns and high quality design resources
          (<Text code>Sketch</Text> and <Text code>Axure</Text>), to help people create their product
          prototypes beautifully and efficiently.
        </Paragraph>

        <Paragraph>
          <ul>
            <li>
              <Link href="/docs/spec/proximity">Principles</Link>
            </li>
            <li>
              <Link href="/docs/spec/overview">Patterns</Link>
            </li>
            <li>
              <Link href="/docs/resources">Resource Download</Link>
            </li>
          </ul>
        </Paragraph>

        <Paragraph>
          Press <Text keyboard>Esc</Text> to exit...
        </Paragraph>
      </Typography>
    </>
  );
}

export default Help;
