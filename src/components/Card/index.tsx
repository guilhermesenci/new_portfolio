import { Box, Card as MUICard } from "@mui/material";
import { useTranslation } from "react-i18next";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import generateImg from "@/utils/generateImg";

import { Repository } from "@/features/github/githubAPI";

type ButtonType = { text: string; function: (repo: Repository) => void };

interface CardProps extends Repository {
  buttons: ButtonType[];
  resume?: boolean;
}

const defaultImg = "https://via.placeholder.com/150";

const Card = ({ buttons, resume, ...repo }: CardProps) => {
  const { t } = useTranslation();
  return (
    <Box
      key={repo.id}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <MUICard
        sx={{
          width: 300,
          maxWidth: 300,
          height: resume ? 0 : '100%',
          transition: "ease-in-out 0.3s",
        }}
      >
        <CardMedia
          component="img"
          alt={repo.name}
          image={generateImg(repo.name, repo.owner.login) ?? defaultImg}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {repo.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {repo.description ?? t("components.card.noDescription")}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {repo.language
              ? `${t("components.card.language")} ${repo.language}`
              : t("components.card.notEspecified")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("components.card.dateFormat") +
              new Date(repo.pushed_at).toLocaleDateString()}
          </Typography>
        </CardContent>

        {buttons ? (
          <CardActions>
            {buttons.map((btn) => (
              <Button
                key={btn.text}
                size="small"
                onClick={() => btn.function(repo)}
              >
                {btn.text}
              </Button>
            ))}
          </CardActions>
        ) : null}
      </MUICard>
    </Box>
  );
};

export default Card;
