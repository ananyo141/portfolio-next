import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  username: string;
  contactDate?: Date;
  userPhone?: string;
  userMessage?: string;
}

export const ContactFeedbackMail = ({
  username,
  contactDate: loginDate = new Date(),
  userPhone,
  userMessage,
}: EmailProps) => {
  const formattedDate = loginDate.toLocaleTimeString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  });

  return (
    <Html>
      <Head />
      <Preview>You sire, are the best.</Preview>
      <Body style={main}>
        <Container>
          <Section style={content}>
            <Img
              width={620}
              src="https://media.giphy.com/media/Rxt5Nxbl3KM3DhyxZm/giphy.gif"
            />

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                    textTransform: "capitalize",
                  }}
                >
                  Hi {username},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  I got your message and would love to get in touch with you.
                </Heading>
                <Text style={paragraph}>
                  First off, I wanted to give you a big virtual high-five for
                  filling out the contact form on my personal portfolio website.
                  Your message totally made my day! 🌟
                </Text>
                <Text style={paragraph}>
                  I just wanted to drop you a quick note to let you know that I
                  received your message loud and clear. Thank you so much for
                  taking the time to reach out and show interest in my work.
                  Your support means the world to me!
                </Text>

                <Text style={paragraph}>
                  Here&apos;s a quick summary of what you just sent me:
                </Text>
                <b>Time: </b>
                {formattedDate} IST
                <br />
                <b>Phone: </b>
                {userPhone}
                <br />
                <b>Message: </b>
                {userMessage}
                <Text
                  style={{
                    color: "rgb(0,0,0, 0.5)",
                    fontSize: 14,
                    marginTop: -5,
                  }}
                >
                  *This is an automated email, please do not reply. Expect to
                  hear back from me real soon! ⚡️
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button style={{ ...button, fontStyle: "italic" }}>
                  Au revoir!
                </Button>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img
              width={620}
              height={250}
              src="https://media.giphy.com/media/bqxbgri8lBSzvMVI3Y/giphy.gif"
            />
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2023 | Ananyobrata Pal, Kolkata, West Bengal, India | Freelancer,
            Software Engineer | <Link>ananyo141.github.io</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactFeedbackMail;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  padding: "12px 30px",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const boxInfos = {
  padding: "20px 40px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
