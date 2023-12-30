import { DataSource, Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private jwtService: JwtService,
    dataSource: DataSource
  ) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async loginUser(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = await this.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload ={ username };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}