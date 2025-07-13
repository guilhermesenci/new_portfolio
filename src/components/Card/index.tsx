import { Card as MUICard } from "@mui/material";
import { useTranslation } from "react-i18next";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import generateImg from "@/utils/generateImg";

import { Repository } from "@/features/github/githubAPI";

type ButtonType = { text: string; function: () => void };

interface CardProps extends Repository {
  buttons: ButtonType[];
}

const defaultImg = "https://via.placeholder.com/150";

const Card = ({ buttons, ...repo }: CardProps) => {
  const { t } = useTranslation();
  return (
    <MUICard sx={{ width: 300, maxWidth: 300 }}>
      <CardMedia
        component="img"
        alt={repo.name}
        height="140"
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
            <Button key={btn.text} size="small" onClick={btn.function}>
              {btn.text}
            </Button>
          ))}
        </CardActions>
      ) : null}
    </MUICard>
  );
};

export default Card;
